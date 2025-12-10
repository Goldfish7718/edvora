import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  title: string;
  description: string;
  instructor: string;
  enrolmentCount: number;
  rating: number;
  category: string;
}

export function CourseCard({
  title,
  description,
  instructor,
  enrolmentCount,
  rating,
  category,
}: CourseCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="line-clamp-2">{title}</CardTitle>
            <CardDescription className="mt-1">{instructor}</CardDescription>
          </div>
          <Badge variant="secondary">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{rating}</span>
            <span className="text-muted-foreground">⭐</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {enrolmentCount.toLocaleString()} students
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
