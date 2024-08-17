import HomeIcon from "/public/icons/HomeIcon";
import SearchIcon from "/public/icons/SearchIcon";
import TrendingUpIcon from "/public/icons/TrendingUpIcon";
import MessageIcon from "/public/icons/MessageIcon";
import HeartIcon from "/public/icons/HeartIcon";
import CreateIcon from "/public/icons/CreateIcon";
import ReelsIcon from "/public/icons/ReelsIcon";
import LogoInstagram from "/public/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { useState } from "react";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { likeNotification } = useSelector(
    (state) => state.realTimeNotification
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const createPostHandler = () => {
    setOpen(true);
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      createPostHandler();
    } else if (textType === "Profile") {
      navigate(`/profile/${user._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Message") {
      navigate("/chat");
    }
  };

  const sidebarItems = [
    { icon: <HomeIcon />, text: "Home" },
    { icon: <SearchIcon />, text: "Search" },
    { icon: <TrendingUpIcon />, text: "Explore" },
    { icon: <ReelsIcon />, text: "Reels" },
    { icon: <MessageIcon />, text: "Message" },
    { icon: <HeartIcon />, text: "Notifications" },
    { icon: <CreateIcon />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];
  return (
    <div className="fixed top-0 left-0 z-10 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <div className="my-8 pl-3">
          <LogoInstagram />
        </div>
        <div className="">
          {sidebarItems.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => sidebarHandler(item.text)}
                className="flex items-center gap-4 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
              >
                {item.icon}
                <span>{item.text}</span>
                {item.text === "Notifications" &&
                  likeNotification.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                          size="icon"
                        >
                          {likeNotification.length}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div>
                          {likeNotification.length === 0 ? (
                            <p>No new notification</p>
                          ) : (
                            likeNotification.map((notification) => {
                              return (
                                <div
                                  className="flex items-center gap-2 my-2"
                                  key={notification.userId}
                                >
                                  <Avatar>
                                    <AvatarImage
                                      src={
                                        notification.userDetails?.profilePicture
                                      }
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                  <p className="text-sm">
                                    <span className="font-bold">
                                      {notification.userDetails?.username}
                                    </span>{" "}
                                    Liked your post
                                  </p>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
              </div>
            );
          })}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
