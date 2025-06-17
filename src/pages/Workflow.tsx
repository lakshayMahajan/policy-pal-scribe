import React from 'react';
import { Header } from '@/components/Header';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { Agent } from '@/types/insurance';
import { agents } from '@/dummy-data/agents';

const Workflow = () => {

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-amber-500 animate-pulse" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Processing</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return null;
    }
  };

  const totalFindings = agents.reduce((sum, agent) => sum + agent.findings, 0);
  const completedAgents = agents.filter(agent => agent.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agent Workflow</h1>
          <p className="text-gray-600">Monitor AI agents analyzing your policy document in real-time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Findings</p>
                  <p className="text-2xl font-bold text-gray-900">{totalFindings}</p>
                </div>
                <Brain className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Agents Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedAgents}/{agents.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Risk Issues</p>
                  <p className="text-2xl font-bold text-red-600">3</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Processing Time</p>
                  <p className="text-2xl font-bold text-gray-900">8.3s</p>
                </div>
                <Clock className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {agents.map((agent, index) => (
            <Card key={agent.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <agent.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{agent.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(agent.status)}
                    {getStatusBadge(agent.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Progress</p>
                    <Progress value={agent.progress} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">{agent.progress}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Findings</p>
                    <p className="text-lg font-semibold text-gray-900">{agent.findings}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Last Run</p>
                    <p className="text-sm text-gray-700">{agent.lastRun}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Processing Time</p>
                    <p className="text-sm text-gray-700">{agent.processingTime}</p>
                  </div>
                </div>

                {agent.status === 'completed' && agent.findings > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-600 mb-2">Recent Findings</p>
                    <div className="space-y-2">
                      {index === 0 && (
                        <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          • Identified 12 distinct policy clauses
                        </div>
                      )}
                      {index === 1 && (
                        <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          • Water damage clause (Risk Score: 8/10)
                        </div>
                      )}
                      {index === 2 && (
                        <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          • Generated 3 exploit scenarios for high-risk clauses
                        </div>
                      )}
                      {index === 3 && (
                        <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          • Found 2 potential regulatory conflicts
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
