import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  useCreatePendaftaranMutation,
  useDeletePendaftaranMutation,
  useEditPendaftaranMutation,
} from "@/lib/react-query/queriesAndMutation";
import { cn } from "@/lib/utils";
import { IPendaftaran } from "@/types";
import { pendaftaranSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Calendar } from "../ui/calendar";
import "./Input.css";

interface Props {
  pendaftaran?: IPendaftaran;
}

const PendaftaranForm = ({ pendaftaran }: Props) => {
  const { toast } = useToast();
  const { mutateAsync: createPendaftaran, isPending } =
    useCreatePendaftaranMutation();
  const { user } = useAuth();
  const { token } = user!;
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof pendaftaranSchema>>({
    defaultValues: {
      user_id: String(pendaftaran?.user_id) || "",
      dokter_id: String(pendaftaran?.dokter_id) || "",
      ruang_id: String(pendaftaran?.ruang_id) || "",
      status: pendaftaran?.status || "pending",
      tanggal_pendaftaran: pendaftaran?.tanggal_pendaftaran
        ? new Date(pendaftaran?.tanggal_pendaftaran)
        : new Date(),
    },
    resolver: zodResolver(pendaftaranSchema),
  });

  const { mutateAsync: editPendaftaran, isPending: isEditPending } =
    useEditPendaftaranMutation();

  const { mutateAsync: deletePendaftaran, isPending: isDeletePending } =
    useDeletePendaftaranMutation();

  async function onSubmit(values: z.infer<typeof pendaftaranSchema>) {
    try {
      const { user_id, dokter_id, ruang_id, status, tanggal_pendaftaran } =
        values;

      if (pendaftaran) {
        await editPendaftaran({
          id: pendaftaran.id,
          user_id: Number(user_id),
          dokter_id: Number(dokter_id),
          ruang_id: Number(ruang_id),
          status,
          tanggal_pendaftaran,
          token,
        });

        toast({
          title: "Success",
          description: "Pendaftaran berhasil diupdate",
        });
        return navigate("/admin/pendaftaran");
      }
      await createPendaftaran({
        user_id: Number(user_id),
        dokter_id: Number(dokter_id),
        ruang_id: Number(ruang_id),
        status,
        tanggal_pendaftaran,
        token,
      });
      toast({
        title: "Success",
        description: "Pendaftaran berhasil ditambahkan",
      });
      return navigate("/admin/pendaftaran");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  }

  const handleDelete = async () => {
    try {
      await deletePendaftaran({
        id: pendaftaran!.id,
        token,
      });
      toast({
        title: "Success",
        description: "Pendaftaran berhasil dihapus",
      });
      return navigate("/admin/pendaftaran");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  };

  return (
    <section className="flex flex-col">
      <h4 className="font-semibold sm:text-2xl text-xl tracking-wide mb-8">
        Pendaftaran
      </h4>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:min-w-[600px] flex flex-col"
        >
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-center">
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Pasien ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="remove-arrow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dokter_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Dokter ID</FormLabel>
                  <FormControl>
                    <Input type="number" className="remove-arrow" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ruang_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Ruang ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="remove-arrow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="selesai">Selesai</SelectItem>
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
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end gap-4 mt-8">
            {pendaftaran && (
              <Button
                className="w-fit min-w-[120px]"
                variant="destructive"
                type="button"
                onClick={handleDelete}
              >
                {isDeletePending ? <Spinner /> : "Delete"}
              </Button>
            )}

            <Button
              type="submit"
              className="w-fit min-w-[120px]"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : isEditPending ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default PendaftaranForm;
