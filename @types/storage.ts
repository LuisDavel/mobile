type FilterProps = {
  unit: { label: string; value: number } | null;
  line: { label: string; value: number } | null;
};

// type DefectProps = {
//   label: string;
//   value: number;
// };

type CredentialsrProps = {
  userid: number | null;
  username: string | null;
};

export interface StorageFilterProps {
  filters: FilterProps | null;
  setFilter: (filter: FilterProps) => void;
}

export interface StorageCredentialsProps {
  credential: CredentialsrProps | null;
  setUser: (credential: CredentialsrProps) => void;
}

export interface StorageImagesProps {
  images: string[] | string;
  setImages: (state: string) => void;
  // removeImages: (state: string) => void;
}

export interface StorageDefectsProps {
  defects: [];
  setDefect: (defects: []) => void;
}

export interface StorageTokenProps {
  token: undefined | string;
  setDeleteToken: () => void;
  setToken: (token: string) => void;
}
export interface StorageTimeProps {
  time: undefined | string;
  setDeleteTime: () => void;
  setTime: (time: string) => void;
}

export interface StorageEndPointProps {
  endpoint: string;
  // setDeleteToken: () => void;
  setEndPoint: (endpoint: string) => void;
}
