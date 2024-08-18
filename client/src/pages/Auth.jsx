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
import { USER_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate()
  // state of SignUp
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state of SignIn
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [tabsValue, setTabsValue] = useState("signin")

  const handleSignUp = async (e) => {
    e.preventDefault()
    console.log({
      name,
      userName,
      email,
      password
    })

    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/signup`, {
        name, userName, email, password
      }, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      })

      toast.success(`${response.data.message}, Now you can SignIn`)
      
      console.log("Response: ", response)

      setName("")
      setUserName("")
      setEmail("")
      setPassword("")

      setTabsValue("signin")
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/signin`, {
        email: userEmail, password: userPassword
      }, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      })
      toast.success(response.data.message)
      navigate("/")
      console.log("Response of singIn: ", response)
      setUserEmail("")
      setUserPassword("")
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("Error inside handleSignIn: ", error)
    }
  };
  return (
    <div className="h-screen w-full xl:grid-cols-2 flex justify-center items-center bg-slate-900">
      <div className="w-full h-full sm:w-[500px] sm:h-[560px] py-4 flex flex-col justify-center items-center bg-[#111f3fs] rounded-xl">
        <div className="mb-6 text-center mx-4 sm:mx-0 absolute top-4">
          <h1 className=" text-2xl font-bold text-green-500">
            Welcome To <span className="text-purple-500">TweetHub</span>
          </h1>
          <p className="text-zinc-400">
            Fill in the details to get started with the{" "}
            <span className="text-purple-500">TweetHub</span>
          </p>
        </div>
        <Tabs
          value={tabsValue}
          onValueChange={(value) => setTabsValue(value)}
          className="mx-4 sm:m-0 sm:w-[400px] absolute top-[80px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card>
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
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="current" className="text-purple-500">
                    UserName
                  </Label>
                  <Input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your userName"
                  />
                </div>
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
