import { Route, Routes } from "react-router-dom";
import { SigninForm, SignupForm } from "./_auth/forms";
import { Home, Explore, AllUsers, Saved, CreatePost, EditPost, PostDetails, Profile, UpdateProfile } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';


function App() {

  return (
    <main className="flex h-screen">
      <Routes>
      {/* public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />}/>
          <Route path="/sign-up" element={<SignupForm />}/>
        </Route>
        

      {/* private Routes */}
        <Route element={<RootLayout/>}>
          <Route index element={<Home />}/>
          <Route path="/explore" element={<Explore/>} />
          <Route path="/all-users" element={<AllUsers/>}/>         
          <Route path="/saved" element={<Saved/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/update-post/:id" element={<EditPost/>}/>
          <Route path="/posts/:id" element={<PostDetails/>}/>
          <Route path="/profile/:id/*" element={<Profile/>}/>
          <Route path="/update-profile/:id" element={<UpdateProfile/>}/>              

        </Route>
        
      </Routes>
    </main>
  );
}

export default App;
