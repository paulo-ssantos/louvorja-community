import { useAccountStore } from '~/stores/accountStore'

export const login = async (email: string, password: string) => {
  const supabase = supabaseClientUtils();
  const accountStore = useAccountStore()

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!response.error) {
    useAccountStore().setupCheckSession()
  }

  return response;
};

export const logout = async () => {
  const supabase = supabaseClientUtils();

  const response = await supabase.auth.signOut();

  if (!response.error) {
    useAccountStore().setupCheckSession()
  }

  return response;
};

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  const supabase = supabaseClientUtils();

  const response = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username,
      },
    },
  });

  return response;
};

export const forgotPassword = async (email: string) => {
  const supabase = supabaseClientUtils();

  const response = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "/",
  });

  return response;
};

export const getCurrentUser = async () => {
  const supabase = supabaseClientUtils();

  const user = await supabase.auth.getUser();

  return user;
};

export const getCurrentSession = async () => {
  const supabase = supabaseClientUtils();

  const session = await supabase.auth.getSession();

  return session;
};

export const updateAccountMetadata = async (key: string, value: string) => {
  const supabase = supabaseClientUtils();

  const response = await supabase.auth.updateUser({
    data: { [key]: value },
  });

  return response;
};
