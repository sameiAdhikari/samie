import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error("Error while logging out");
}

export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

// export async function updateUser({ fullName, password, avatar }) {
//   // console.log(fullName, avatar.name);
//   let updateData;
//   if (fullName) return (updateData = { data: { fullName } });
//   if (password) return (updateData = { password });
//   const { data, error: updateError } = await supabase.auth.updateUser(
//     updateData
//   );
//   console.log(data);
//   if (updateError) throw new Error(updateError.message);
//   if (!avatar) return null;
//   const fileName = `avatar-${data.user.id}-${Math.random()}`;

//   const { error: avatarError } = await supabase.storage
//     .from("avatars")
//     .upload(fileName, avatar);
//   if (avatarError) throw new Error(avatarError.message);

//   const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
//     data: {
//       avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
//     },
//   });
//   if (error2) throw new Error(error2.message);
//   console.log(updatedUser);
//   return updatedUser;
// }

export async function updateUser({ fullName, password, avatar }) {
  let updatedData;
  if (fullName) updatedData = { data: { fullName } };
  if (password) updatedData = { password };
  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error.message);

  if (!avatar) return null;
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
      },
    });
  if (updateUserError) throw new Error(updateUserError.message);
  return { updatedUser, error };
}
