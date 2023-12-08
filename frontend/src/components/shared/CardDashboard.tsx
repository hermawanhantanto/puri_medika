import { Card, CardTitle, CardDescription, CardContent } from "../ui/card";

interface Props {
  title: string;
  jumlah: number;
  children?: React.ReactNode;
}

const CardDashboard = ({ title, jumlah, children }: Props) => {
  return (
    <Card className="pt-4 min-w-[250px]">
      <CardContent>
        <div className="flex items-center justify-between">
          <CardDescription>{title}</CardDescription>
          {children}
        </div>
        <CardTitle className="my-2">{jumlah}</CardTitle>
        <CardDescription className="text-xs">
          Jumlah {title} Saat Ini
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardDashboard;
