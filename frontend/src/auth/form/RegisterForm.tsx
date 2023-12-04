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
import { Input } from "@/components/ui/input";
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
import { cn } from "@/lib/utils";
import { registerSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import "./Input.css";
import { useSignUpMutation } from "@/lib/react-query/queriesAndMutation";
import Spinner from "@/components/shared/Spinner";

const RegisterForm = () => {
  const { toast } = useToast();
  const { mutateAsync: signUp, isPending: isSignUp } = useSignUpMutation();
  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      nama: "",
      email: "",
      password: "",
      nomor_identitas: "",
      jenis_kelamin: "L",
      tanggal_lahir: new Date(),
      nomor_telepon: "",
      alamat: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const {
        nama,
        email,
        password,
        nomor_identitas,
        jenis_kelamin,
        tanggal_lahir,
        nomor_telepon,
        alamat,
      } = values;
      const user = await signUp({
        nama,
        email,
        password,
        nomor_identitas,
        jenis_kelamin,
        tanggal_lahir,
        nomor_telepon,
        alamat,
      });
      if (!user.user) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
      }
      toast({
        title: "Success",
        description: "Silahkan verifikasi email anda",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  }

  return (
    <section className="flex flex-col items-center">
      <h4 className="font-semibold sm:text-2xl text-xl tracking-wide mb-8">
        Silahkan Isi Form Berikut!
      </h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:min-w-[600px] flex flex-col"
        >
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-center">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nomor_identitas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Identitas</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jenis_kelamin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis Kelamin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="L">Laki-Laki</SelectItem>
                      <SelectItem value="P">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tanggal_lahir"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel className="p-1">Tanggal Lahir</FormLabel>
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
            <FormField
              control={form.control}
              name="nomor_telepon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input type="number" className="remove-arrow" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="mt-6 min-w-[290px]"
            disabled={isSignUp}
          >
            {isSignUp ? <Spinner /> : "Register"}
          </Button>
        </form>
      </Form>
      <p className="text-sm mt-4">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-500 font-semibold">
          Log In
        </Link>
      </p>
    </section>
  );
};

export default RegisterForm;
