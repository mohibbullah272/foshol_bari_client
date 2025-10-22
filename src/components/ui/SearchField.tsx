import { Dispatch, SetStateAction, useId } from "react"
import { ArrowRightIcon, SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"


export default function SearchField({setSearchTerm}:{setSearchTerm:Dispatch<SetStateAction<string>>}) {
  const id = useId()
  return (
    <div className="*:not-first:mt-2 max-w-xl mx-auto mb-14">

      <div className="relative">
        <Input
          id={id}
          className="peer ps-9 pe-9"
          placeholder="Search..."
          onBlur={(e)=>setSearchTerm(e.target.value)}
          type="search"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRightIcon size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
