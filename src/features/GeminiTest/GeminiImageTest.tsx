/**
 * @file GeminiImageTest.tsx
 * @description Gemini API 图像生成验证组件
 * 提供上传图片、输入指令并生成新图片的最小化测试界面。
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, Upload, Image } from 'lucide-react';
import { callGeminiApi } from './geminiService';

export const GeminiImageTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [sourceImageUrl, setSourceImageUrl] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSourceImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSourceImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleGenerate = async () => {
    if (!sourceImage || !prompt.trim()) {
      setErrorMessage('请上传图片并输入生成指令');
      setStatus('error');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');
    setGeneratedImageUrl('');

    try {
      const imageDataUrl = await convertImageToBase64(sourceImage);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=AIzaSyATcGzhjgjPUbZ3GW11Lq-Fpy78EF5BCNg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: prompt
              },
              {
                inline_data: {
                  mime_type: sourceImage.type,
                  data: imageDataUrl.split(',')[1] // 移除data:image/type;base64,前缀
                }
              }
            ]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API 调用失败: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (typeof content === 'string' && content.includes('http')) {
        // 提取图片URL
        const urlMatch = content.match(/https?:\/\/[^\s)]+/);
        if (urlMatch) {
          setGeneratedImageUrl(urlMatch[0]);
          setStatus('success');
        } else {
          throw new Error('未能从响应中提取图片URL');
        }
      } else {
        throw new Error(`Gemini API未返回有效的图片URL。响应: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '未知错误';
      setErrorMessage(`图片生成失败: ${errorMsg}`);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSourceImage(null);
    setSourceImageUrl('');
    setPrompt('');
    setGeneratedImageUrl('');
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Gemini 图像生成验证
              {status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
              {status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
            </CardTitle>
            <CardDescription>
              上传源图片，输入生成指令，验证 Gemini API 图像生成功能
            </CardDescription>
          </div>
          <Badge variant={status === 'success' ? 'default' : status === 'error' ? 'destructive' : 'secondary'}>
            {status === 'success' ? '生成成功' : status === 'error' ? '生成失败' : '待测试'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 图片上传 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">源图片上传:</label>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              选择图片
            </Button>
          </div>
          {sourceImageUrl && (
            <div className="mt-2">
              <img 
                src={sourceImageUrl} 
                alt="Source" 
                className="max-h-32 rounded-md border"
              />
            </div>
          )}
        </div>

        {/* 生成指令输入 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">生成指令:</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="输入图像生成指令，例如：将这个人物转换为卡通风格..."
            className="min-h-[80px]"
          />
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <Button 
            onClick={handleGenerate}
            disabled={isLoading || !sourceImage || !prompt.trim()}
            className="flex-1"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? '生成中...' : '开始生成'}
          </Button>
          <Button 
            variant="outline"
            onClick={handleReset}
            disabled={isLoading}
          >
            重置
          </Button>
        </div>

        {/* 结果显示 */}
        {(isLoading || generatedImageUrl || errorMessage) && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">生成结果:</h3>
            <div className={`p-3 rounded-md border min-h-[200px] flex items-center justify-center ${
              status === 'success' ? 'bg-green-50 border-green-200' : 
              status === 'error' ? 'bg-red-50 border-red-200' : 
              'bg-muted'
            }`}>
              {isLoading ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  正在生成图片，请稍候...
                </div>
              ) : generatedImageUrl ? (
                <div className="text-center">
                  <img 
                    src={generatedImageUrl} 
                    alt="Generated" 
                    className="max-h-48 rounded-md mx-auto mb-2"
                    onError={() => {
                      setErrorMessage('图片加载失败');
                      setStatus('error');
                    }}
                  />
                  <p className="text-sm text-green-600">图片生成成功!</p>
                </div>
              ) : errorMessage ? (
                <p className="text-sm text-red-600 text-center">{errorMessage}</p>
              ) : null}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};