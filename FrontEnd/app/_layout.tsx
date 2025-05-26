import { Slot } from 'expo-router';
import { PostProvider } from '../PostContext'; 
import Footer from '../components/Footer';   

export default function Layout() {
  return (
    <PostProvider>
      <Slot/>  
      <Footer/> 
    </PostProvider>
  );
}