import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreatePendaftaranMutation,
  useGetAllDokter,
  useGetAllRuang,
} from "@/lib/react-query/queriesAndMutation";
import { cn } from "@/lib/utils";
import { IDokter, IRuang } from "@/types";
import { pendaftaranPasienSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PendaftaranPasien = () => {
  const { toast } = useToast();

  const token = JSON.parse(localStorage.getItem("user")!).token;
  const id = JSON.parse(localStorage.getItem("user")!).id;

  const form = useForm<z.infer<typeof pendaftaranPasienSchema>>({
    resolver: zodResolver(pendaftaranPasienSchema),
    defaultValues: {
      dokter_id: "",
      ruang_id: "",
      tanggal_pendaftaran: new Date(),
    },
  });

  const { data: dokters } = useGetAllDokter({
    token,
  });

  const { data: ruangs } = useGetAllRuang({
    token,
  });

  const { mutateAsync: daftarPasien, isPending } =
    useCreatePendaftaranMutation();

  async function onSubmit(values: z.infer<typeof pendaftaranPasienSchema>) {
    try {
      if (!values.dokter_id || !values.ruang_id || !values.tanggal_pendaftaran)
        return toast({ title: "Mohon isi semua form", variant: "destructive" });

      await daftarPasien({
        user_id: id,
        dokter_id: Number(values.dokter_id),
        ruang_id: Number(values.ruang_id),
        tanggal_pendaftaran: values.tanggal_pendaftaran,
        status: "pending",
        token,
      });

      toast({
        title: "Success mendaftar pasien!",
      });
    } catch (error) {
      toast({
        title: `${error}`,
        variant: "destructive",
      });
    }
  }

  return (
    <main className="flex w-full flex-col min-h-screen">
      <section
        className="flex flex-col xl:p-36 lg:p-24 gap-2 sm:bg-[url('assets/images/hero-pendaftaran.png')] bg-cover bg-no-repeat xl:min-h-[550px] bg-center sm:py-24 sm:px-12 p-5"
        data-aos="zoom-in-up"
        data-aos-duration="3000"
      >
        <h1 className="xl:text-3xl lg:text-xl text-xs text-blue-600 font-bold ">
          Selamat Datang di Puri Medika
        </h1>
        <p className="xl:max-w-[400px] lg:max-w-[300px] max-w-[200px] lg:text-sm xl:text-lg text-xs text-slate-600 font-semibold">
          Segera konsultasikan dirimu untuk dapatkan pelayanan konsultasi dan
          perawatan medis terbaik
        </p>
      </section>
      <section
        className="flex justify-between bg-blue-200"
        data-aos="zoom-in-up"
        data-aos-duration="3000"
      >
        <div className="bg-white rounded p-12 flex flex-col flex-wrap lg:w-1/2 w-full lg:m-36 shadow">
          <h1 className="sm:text-xl text-lg text-slate-600 font-semibold text-center mb-4">
            Pendaftaran Pasien
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="dokter_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dokter</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Dokter" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dokters?.data?.data.map((dokter: IDokter) => (
                          <SelectItem value={String(dokter.id)} key={dokter.id}>
                            {dokter.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ruang_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poli</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Poli" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ruangs?.data?.data.map((ruang: IRuang) => (
                          <SelectItem value={String(ruang.id)} key={ruang.id}>
                            {ruang.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggal_pendaftaran"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel className="p-1">Tanggal Pendaftaran</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? <Spinner /> : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex items-end max-lg:hidden">
          <img
            src="assets/images/decoration-1.png"
            alt="decor"
            height={600}
            width={600}
            className="object-contain"
          />
        </div>
      </section>
    </main>
  );
};

export default PendaftaranPasien;
