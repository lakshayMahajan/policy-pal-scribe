import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Upload as UploadIcon, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import axios from 'axios'

const nocodbapikey = import.meta.env.NOCODB_API_KEY;

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';

const Upload = () => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState<string>('');

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate file upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('processing');

          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (typeof e.target?.result === 'string') {
                setFileContent(e.target.result);
              } else {
                alert('Unexpected file content format.');
              }
            };
            reader.onerror = () => {
              alert('Error reading the file.');
            };
            reader.readAsText(file);
          }
          
          databasePost();
          // Simulate processing
          setTimeout(() => {
            setUploadStatus('completed');
          }, 3000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);

  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type === 'application/pdf') {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <Loader2 className="h-6 w-6 animate-spin text-blue-500" />;
      case 'processing':
        return <Loader2 className="h-6 w-6 animate-spin text-amber-500" />;
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <UploadIcon className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Uploading policy document...';
      case 'processing':
        return 'Analyzing clauses and identifying risks...';
      case 'completed':
        return 'Policy analysis complete. Redirecting to assessment...';
      case 'error':
        return 'Upload failed. Please try again.';
      default:
        return 'Upload a policy document to begin risk assessment';
    }
  };

  const databasePost = async () => {
    try {
      await axios.post('https://app.nocodb.com/api/v2/tables/miq0dfta0t7lqpp/records', { 
          headers: {
            "accept": "application/json",
            "xc-token": nocodbapikey,
          },
          body: {
          "policyName": fileName,
          "uploadDate": Date.now().toString(),
          "status": "string",
          "riskScore": "string",
          "flaggedClauses": "string",
          "totalClauses": "string",
          "version": "string",
          "text": fileContent}
       });
      alert('Data created successfully!');
      // Optionally, fetch and update the displayed data
    } catch (error) {
      console.error('Error creating data:', error);
    }

  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Policy Document</h1>
          <p className="text-gray-600">Upload an insurance policy for comprehensive risk analysis and clause evaluation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon()}
                  <span>Document Upload</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadStatus === 'idle' && (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Drop your policy document here</h3>
                    <p className="text-gray-600 mb-4">or click to browse files</p>
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleFileInput}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Select txt File
                      </label>
                    </Button>
                  </div>
                )}

                {uploadStatus !== 'idle' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{fileName}</p>
                        <p className="text-sm text-gray-600">{getStatusText()}</p>
                      </div>
                    </div>

                    {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
                      <Progress value={uploadStatus === 'uploading' ? uploadProgress : 100} className="w-full" />
                    )}

                    {uploadStatus === 'completed' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-green-800 font-medium">Analysis Complete</span>
                        </div>
                        <p className="text-green-700 mt-1">Found 12 clauses, identified 3 potential risks</p>
                        <Button className="mt-3" onClick={() => window.location.href = '/'}>
                          View Assessment
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Processing Pipeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Document Parsing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Clause Identification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Risk Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Regulatory Compliance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Exploit Simulation</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Supported Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• PDF documents</li>
                  <li>• Maximum file size: 50MB</li>
                  <li>• Text-searchable PDFs preferred</li>
                  <li>• Scanned documents supported</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
