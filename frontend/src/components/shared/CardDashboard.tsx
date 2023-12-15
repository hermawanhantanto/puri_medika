import { Card, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface Props {
  title: string;
  jumlah: number;
  children?: React.ReactNode;
  isLoading?: boolean;
}

const CardDashboard = ({ title, jumlah, children, isLoading }: Props) => {
  return (
    <Card className="pt-4 min-w-[250px] shadow">
      <CardContent>
        <div className="flex items-center justify-between">
          <CardDescription>{title}</CardDescription>
          {children}
        </div>
        <CardTitle className="my-2">
          {isLoading ? <Skeleton className="w-8 h-6" /> : jumlah}
        </CardTitle>
        <CardDescription className="text-xs">
          Jumlah {title} Saat Ini
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardDashboard;
