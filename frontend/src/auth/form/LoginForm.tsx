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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useSignInMutation } from "@/lib/react-query/queriesAndMutation";
import { loginSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const LoginForm = () => {
  const { setUser } = useAuth();
  const { toast } = useToast();
  const { mutateAsync: signIn, isPending: isLogin } = useSignInMutation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const { email, password } = values;
      const user = await signIn({ email, password });

      if (!user.email_verified_at)
        return toast({
          variant: "destructive",
          title: "Email belum terverifikasi",
          action: <ToastAction altText="Try again">Coba lagi</ToastAction>,
        });

      const userData = {
        id: user.id,
        email: user.email,
        token: user.token,
        role: user.role,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast({
        title: "Success! berhasil login",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Username atau password salah",
        action: <ToastAction altText="Try again">Coba lagi</ToastAction>,
      });
    }
  }

  return (
    <section className="flex flex-col items-center">
      <h4 className="font-semibold sm:text-2xl text-xl tracking-wide mb-8">
        Selamat Datang!
      </h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:min-w-[400px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    type="email"
                    {...field}
                  />
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
          <Button type="submit" disabled={isLogin}>
            {isLogin ? <Spinner /> : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm mt-4">
        Belum punya akun?{" "}
        <Link to="/register" className="text-blue-500 font-semibold">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default LoginForm;
