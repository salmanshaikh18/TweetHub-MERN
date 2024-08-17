import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LuLoader2 } from "react-icons/lu";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    // try {
    //   setIsLoading(true);
    //   if (password !== confirmPassword) {
    //     throw new Error("Password do not match");
    //   }
    //   const response = await apiClient.post(SignUpRoute, {
    //     email,
    //     password,
    //   });
    //   setUserInfo(response.data)
    //   console.log("Response: ", response);
    //   toast.success(response.data.message);
    //   setEmail("");
    //   setPassword("");
    //   setConfirmPassword("");
    //   navigate("/profile");
    // } catch (error) {
    //   handleError(error);
    // } finally {
    //   setIsLoading(false); // Reset loading state after request completes
    // }
  };

  const handleSignIn = async () => {
    // try {
    //   setIsLoading(true);
    //   const response = await apiClient.post(SignInRoute, {
    //     userEmail,
    //     userPassword,
    //   });
    //   console.log("Response: ", response);
    //   toast.success(response.data.message);
    //   setUserEmail("");
    //   setUserPassword("");
    //   if (response.data.id) {
    //     setUserInfo(response.data)
    //     if (response.data.profileSetup) {
    //       navigate("/chat");
    //     } else {
    //       navigate("/profile");
    //     }
    //   }
    // } catch (error) {
    //   handleError(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };
  return (
    <div className="h-screen w-full xl:grid-cols-2 flex justify-center items-center bg-slate-900">
      <div className="w-full h-full sm:w-[500px] sm:h-[560px] py-4 flex flex-col justify-center items-center bg-[#111f3fs] rounded-xl">
        <div className="mb-6 text-center mx-4 sm:mx-0 absolute top-12">
          <h1 className=" text-2xl font-bold text-green-500">
            Welcome To <span className="text-purple-500">TweetHub</span>
          </h1>
          <p className="text-zinc-400">
            Fill in the details to get started with the{" "}
            <span className="text-purple-500">TweetHub</span>
          </p>
        </div>
        <Tabs
          defaultValue="signin"
          className="mx-4 sm:m-0 sm:w-[400px] absolute top-[130px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="h-[404px]">
              <CardHeader>
                <CardTitle className="text-green-500">Sign In</CardTitle>
                <CardDescription>
                  Access your account effortlessly with our secure sign-in page.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username" className="text-purple-500">
                    Email
                  </Label>
                  <Input
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username" className="text-purple-500">
                    Password
                  </Label>
                  <Input
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <button
                  className="flex justify-center items-center gap-2 bg-purple-900 hover:bg-purple-950 px-3 py-2 rounded-md text-sm transition-all ease-in-out duration-300"
                  onClick={handleSignIn}
                  // variant={"secondary"}
                >
                  Sign In {isLoading && <LuLoader2 />}
                </button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-500">Sign Up</CardTitle>
                <CardDescription>
                  Create your account effortlessly with our easy sign-up page.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current" className="text-purple-500">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="current" className="text-purple-500">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new" className="text-purple-500">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Your Password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <button
                  className="flex justify-center items-center gap-2 bg-purple-900 hover:bg-purple-950 px-3 py-2 rounded-md text-sm transition-all ease-in-out duration-300"
                  onClick={handleSignUp}
                  // variant={"secondary"}
                >
                  Sign Up {isLoading && <LuLoader2 />}
                </button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
