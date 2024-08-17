import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((state) => state.auth);

  return (
    <div className="my-10">
      <div className="flex items-center text-sm justify-between">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See all</span>
      </div>
      {suggestedUsers?.map((user) => {
        return (
          <div
            key={user._id}
            className="flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-2 mt-3">
              <Link to={`/profile/${user?._id}`}>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div className="">
                <h1 className="font-semibold text-sm">
                  <Link to={`/profile/${user._id}`}>{user?.username}</Link>
                </h1>
                <span className="text-gray-600 text-sm">
                  {user?.bio || "Bio here..."}
                </span>
              </div>
            </div>
            <span className="text-[#3BADF8] text-sm font-bold cursor-pointer hover:text-[#3bacf8d8] ">
              Follow
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
