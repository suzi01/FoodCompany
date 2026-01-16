import SearchIcon from '@/assets/icons/Search.png';
import CloseIcon from '@/assets/icons/Close.png';
import { Image } from '../Image';

interface SearchBarProps {
  className?: string;
  text: string;
  onTextChange: (text: string) => void;
  onClear: () => void;
}

export const SearchBar = ({
  className,
  text,
  onTextChange,
  onClear,
}: SearchBarProps) => {
  return (
    <label
      data-testid="search-label"
      htmlFor="search-input"
      className={`cursor-pointer flex justify-center items-center gap-6 bg-white rounded-md p-4 border border-gray-300 ${className}`}
    >
      <div className="flex gap-4 flex-grow items-center">
        <Image
          src={SearchIcon}
          alt="search-icon"
          className="w-[35px] h-[35px]"
        />
        <input
          id="search-input"
          aria-label="search-input"
          type="text"
          placeholder="Search..."
          className="text-md focus:outline-none w-full"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
        />
      </div>

      {text && text.length > 1 && (
        <button
          onClick={() => onClear()}
          type="reset"
          aria-label="reset-search"
        >
          <Image
            src={CloseIcon}
            alt="close-icon"
            className="w-[25px] h-[25px]"
          />
        </button>
      )}
    </label>
  );
};
