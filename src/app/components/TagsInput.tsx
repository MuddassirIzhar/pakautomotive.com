import { useRef, useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function TagsInput({ value, onChange }: TagsInputProps) {

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [tag, setTag] = useState("");

  const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault(); // Prevent default tab behavior
    if (tag.trim() !== "" && !value.includes(tag.trim())) {
      onChange([...value, tag.trim()]);
    }
    setTag("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((t) => t !== tagToRemove));
  };

//   const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     let value = (event.target as HTMLInputElement).value;
//     if (event.key === "Tab") {
//       event.preventDefault(); // Prevent default tab behavior
//       if (tag.trim() !== "" && !value.includes(tag.trim())) {
//         onChange([...value, tag.trim()]);
//       }
//       setTag("");
//     }
//   };
  return (
    <div className="flex flex-col gap-2">
        <div className="space-y-2 flex flex-col items-start">
            <div className="w-full flex  flex-col">
                <div className="w-full">
                    <div className="flex flex-row flex-wrap items-center gap-0 p-2 w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">

                        {value.map((t) => (
                        <Badge key={t} variant="default" className="flex items-center mx-1">
                            {t}
                            <Button variant="ghost" size="icon" className="ml-1 p-0 w-6 h-6" onClick={() => removeTag(t)}>
                            <X className="h-4 w-4" />
                            </Button>
                        </Badge>
                        ))}
                        <Input
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        onKeyDown={(e) => e.key === "Tab" && addTag(e)}
                        // onKeyDown={(e) => addTag(e)}
                        placeholder="Type here and press TAB to make it into tag..."
                        className="flex shadow-none rounded-md border-input px-1 py-1 text-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-0 h-5 bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 flex-1 w-fit"
                        />
                    </div>
                </div>
                <div className="w-full"></div>
            </div>
            <p className="text-[12px] text-muted-foreground text-left">
              This blog contains various tags that categorize its content, making it easier for readers to explore related topics efficiently. 
              Tags help improve navigation, organization, and discoverability of relevant information.
              <br />
              Same multiple tags will be consider as single.</p>
        </div>
      {/* <div className="flex flex-wrap gap-2">
        {value.map((t) => (
          <Badge key={t} variant="default" className="flex items-center space-x-1">
            {t}
            <Button variant="ghost" size="icon" className="ml-1 p-0" onClick={() => removeTag(t)}>
              <X className="h-4 w-4" />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
          placeholder="Add a tag..."
        />
        <Button type="button" onClick={addTag}>
          Add
        </Button>
      </div> */}
    </div>
  );
}
