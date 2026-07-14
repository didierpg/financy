interface UserAvatarProps {
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function UserAvatar({
  name,
  size = "md",
  className = "",
}: UserAvatarProps) {
  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((chunk) => chunk[0])
        .join("")
        .toUpperCase()
    : "CT";

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-xl",
  };

  return (
    <div
      className={`
        rounded-full bg-gray-200 flex items-center justify-center 
        font-bold text-gray-600 tracking-tight transition-colors 
        select-none ${sizeClasses[size]} ${className}
      `}
    >
      {initials}
    </div>
  );
}
