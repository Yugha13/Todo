import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";



export function Login() {
  const [gmail, setgmail] = useState<string>("");
  const [pass, setpass] = useState<string>("");
  const [isloading, setloading] = useState(false);
  const redirect = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ gmail, pass });
    try {
      setloading(true);
      const { data } = await axios.post(
        "http://localhost:5001/api/v1/user/login",
        { gmail, password: pass },
        { withCredentials: true }
      );
      console.log(data);
      redirect("/task");
    } catch (e) {
      console.log(e);
    }
    setloading(!true);
  };
  
  const onSignUp = async () => {
    const { data } = await axios.post(
      "http://localhost:5001/api/v1/user/signup",
      { gmail, password: pass },
      { withCredentials: true }
    );
    console.log(data);
  };


  return (
    <form onSubmit={handleSubmit}>
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>LOGIN</CardTitle>
            <CardDescription>
              to make your Tasks.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="gmail">Gmail</Label>
              <Input 
              id="gmail" 
              value={gmail}
              onChange={(e) => setgmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                value={pass}
                onChange={(e) => setpass(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>SIGNUP</CardTitle>
            <CardDescription>
              Welcome, signup and join us ⬇.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Gmail</Label>
              <Input 
                id = "current" 
                type = "gmail"
                value = { gmail } 
                onChange={(e) => {setgmail( e.target.value )}}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input 
                id="new" 
                type="password"
                value={pass}
                onChange={(e) => {setpass(e.target.value)}}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="button" onClick={onSignUp}>Sign Up</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </form>
  )
}