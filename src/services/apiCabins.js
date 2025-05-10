import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    throw new Error("Cabin couldn't be loaded");
  } else return data;
}

export async function createEditCabin(newCabin, id) {
  // https://egrcqhholauahimibjiy.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // console.log(newCabin.image);
  // console.log(supabaseUrl);
  // console.log(hasImagePath);
  const imageUrl = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("Cabins");
  // 1)creacte
  if (!id) query = query.insert([{ ...newCabin, image: imageUrl }]);

  // 2) edit
  if (id) query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("cabin couldn't be created");
  }

  // upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("Cabins").delete().eq("id", data.id);
  }

  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    throw new Error("cann't delete a cabin from api");
  }
  return data;
}
