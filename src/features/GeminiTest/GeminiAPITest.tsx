/**
 * @file GeminiAPITest.tsx
 * @description Gemini API 通讯前哨测试组件
 * 提供最小化界面验证与 Gemini API 的基础通讯链路。
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { callGeminiApi } from './geminiService';

export const GeminiAPITest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleRunTest = async () => {
    setIsLoading(true);
    setResponse('');
    setStatus('idle');

    try {
      const result = await callGeminiApi('请用中文回复"Gemini API 通讯链路测试成功"');
      setResponse(result);
      setStatus('success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      setResponse(`测试失败: ${errorMessage}`);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Gemini API 通讯前哨
              {status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
              {status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
            </CardTitle>
            <CardDescription>
              验证与 Gemini API 的基础通讯链路
            </CardDescription>
          </div>
          <Badge variant={status === 'success' ? 'default' : status === 'error' ? 'destructive' : 'secondary'}>
            {status === 'success' ? '连接正常' : status === 'error' ? '连接失败' : '待测试'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handleRunTest}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? '测试中...' : 'Run Test'}
        </Button>

        {(response || isLoading) && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">API Response:</h3>
            <div className={`p-3 rounded-md border min-h-[100px] ${
              status === 'success' ? 'bg-green-50 border-green-200' : 
              status === 'error' ? 'bg-red-50 border-red-200' : 
              'bg-muted'
            }`}>
              {isLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  正在等待 API 响应...
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap">{response}</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};