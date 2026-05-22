"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("/// GLOBAL ERROR CATCHED ///", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 bg-[#300] text-white font-mono min-h-screen">
          <h2>🚨 FATAL PRODUCTION ERROR 🚨</h2>
          <p className="text-[#F88]">{this.state.error && this.state.error.toString()}</p>
          <pre className="whitespace-pre-wrap bg-[#111] p-5 mt-5">
            {this.state.errorInfo?.componentStack || this.state.error?.stack || "No stack trace available."}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
