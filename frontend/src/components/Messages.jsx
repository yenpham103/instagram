import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTM";
const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessage();
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="w-20 h-20">
            <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
          <Link to={`/profile/${selectedUser?._id}`}>
            <Button variant="secondary" className="h-8 my-2 ">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {messages &&
          messages.map((msg) => {
            return (
              <div
                className={clsx(
                  "flex",
                  msg.senderId === user?._id ? "justify-end" : "justify-start"
                )}
                key={msg._id}
              >
                <div
                  className={clsx(
                    "p-2 rounded-lg max-w-xs break-words",
                    msg.senderId === user?._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  )}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Messages;
Messages.propTypes = {
  selectedUser: PropTypes.object,
};
