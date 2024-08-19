"use client";

import { SearchIcon, UploadIcon } from "./icon";
import { signOut } from "next-auth/react";
import { fetchWrapper } from "@/utils/api";
import { useRouter, usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useAtom } from "jotai";
import { showSession, showSearch, navFnAtom } from "@/store";
import { useEffect, useRef } from "react";
import showToast from "./toast";

const Nav = () => {
  const [session, setS] = useAtom(showSession);
  const [searchValue, setSearchValue] = useAtom(showSearch)
  const [navFunc, setNavFunc] = useAtom(navFnAtom)

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/books");
    }
  }, []);

  const handleSignOut = () => {
    signOut();
  };

  const handleInputChange = (event: { target: { value: any } }) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: { target: any; key: string }) => {
    if (event.key === "Enter") {
      setSearchValue(event.target.value);
    }
  };

  // upload File
  const fileInputRef: any = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef && fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    const allowedTypes = ["application/epub+zip"];
    if (!allowedTypes.includes(file.type)) {
      showToast('only support epub', 'error')
      return
    }
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetchWrapper("/api/book", {
        method: "POST",
        body: formData,
      });

      if (res.success) {
        navFunc.fn()
      } else {
        showToast(res.message, 'error')
      }
    }
  };

  return (
    <Navbar isBordered maxWidth={"full"} className="px-12">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          {/* <AcmeLogo /> */}
          <p className="hidden sm:block font-bold text-inherit">Memory</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link
              color={pathname === "/books" ? "primary" : "foreground"}
              href="/book"
            >
              Books
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link
              href="#"
              color={pathname === "/notes" ? "primary" : "foreground"}
            >
              Notes
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {/* <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          startContent={<SearchIcon size={18} />}
          type="search"
        /> */}
        {pathname === "/books" && (
          <Button
            color="primary"
            endContent={<UploadIcon />}
            onClick={handleButtonClick}
          >
            upload book
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Button>
        )}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={session?.user?.image || ""}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session?.user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
export default Nav;
