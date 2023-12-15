import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import { Card, CardContent } from "../ui/card";

interface Props {
  pasien: number;
  dokter: number;
  ruang: number;
  pendaftaran: number;
  rekam_medis: number;
}

const DashboardChart = ({
  pasien,
  dokter,
  ruang,
  pendaftaran,
  rekam_medis,
}: Props) => {
  const data = [
    { name: "Pasien", value: pasien },
    { name: "Dokter", value: dokter },
    { name: "Ruang", value: ruang },
    { name: "Pendaftaran", value: pendaftaran },
    { name: "Rekam Medis", value: rekam_medis },
  ];

  return (
    <Card className="sm:w-full sm:pt-12 pt-4 max-sm:max-w-[300px]">
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" barSize={80} fill="#3764D8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardChart;
