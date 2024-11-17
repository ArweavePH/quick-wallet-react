"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { shortenAddress } from "@/lib/utils";
import { Key as KeyIcon, User as UserIcon } from "@phosphor-icons/react";
import { QuickWallet } from "quick-wallet";
import { useEffect, useState } from "react";
// import { getKeyfile } from "quick-wallet/core/accounts";
// import { freeDecryptedWallet } from "quick-wallet/core/accounts/encryption";
// import { downloadFile } from "quick-wallet/utils";

export const ConnectButton = () => {
  const [account, setAccount] = useState<string>();
  // const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    await QuickWallet.connect();
    setAccount(await QuickWallet.getActiveAddress());
  };

  const handleDownloadKeyfile = async () => {
    alert("Keyfile download coming soon...");
    // const jwk = await getKeyfile();
    // const content = JSON.stringify(jwk);
    // const blob = new Blob([content], { type: "application/json" });
    // const blobUrl = URL.createObjectURL(blob);

    // // remember to free the decrypted wallet from memory for security purposes
    // freeDecryptedWallet(jwk);

    // // download wallet
    // downloadFile(blobUrl, "quick-wallet-keyfile.json");
  };

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      const parsedAccount = JSON.parse(storedAccount);
      setAccount(parsedAccount.address);
    }
  }, []);

  if (account) {
    return (
      <Popover>
        <PopoverTrigger className="flex hover:bg-gray-700 gap-2 items-center text-sm rounded-lg text-white bg-gray-800 px-3 py-2">
          <UserIcon />
          {shortenAddress(account)}
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          <button
            className="w-full flex items-center justify-center gap-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-all duration-200 p-2 text-white text-sm"
            onClick={handleDownloadKeyfile}
            disabled
          >
            <KeyIcon /> Download keyfile
          </button>
          {/* <button
            className="w-full flex items-center justify-center gap-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all duration-200 p-2 text-black text-sm"
            onClick={handleDisconnect}
          >
            <EjectIcon /> Disconnect
          </button> */}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-black hover:bg-gray-800 transition-all duration-200 text-white px-4 py-2 rounded-lg text-sm">
        Connect Wallet
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <button
            onClick={handleConnect}
            className="flex items-center gap-4 hover:bg-gray-200 rounded-lg p-4 transition-all duration-200"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-green-50">
              <img
                src={"../assets/quick-wallet.png"}
                alt="QuickWallet"
                width={48}
                height={48}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">QuickWallet</h3>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                  Recommended
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Creates a new wallet for you, instantly.
              </p>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
