import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  icon: ReactNode;
  description?: string;
  gradient?: boolean;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon, 
  description,
  gradient = false 
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "decrease":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (changeType) {
      case "increase":
        return "text-success";
      case "decrease":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className={`financial-card hover:shadow-lg transition-all duration-200 ${gradient ? 'bg-gradient-to-br from-primary/5 to-primary/10' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary-light/20 rounded-lg">
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="metric-label font-medium">{title}</h3>
        <p className="metric-value">{value}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}