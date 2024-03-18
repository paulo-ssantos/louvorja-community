import type { Json } from "~/types/supabase";

export const retriveAllCollectionsFiles = async (): Promise<any[]> => {
  const supabase = supabaseClientUtils();
  let collectionsFileList: object[] = [];
  try {
    const categories = await supabase.storage.from("slja").list("");

    if (categories.data) {
      for (let i = 0; i < categories.data.length; i++) {
        const category = categories.data[i];

        const files = await supabase.storage.from("slja").list(category.name);

        if (files.data) {
          for (let j = 0; j < files.data.length; j++) {
            const collection = files.data[j];

            if (collection.name.includes(".emptyFolderPlaceholder")) {
              continue;
            }

            collectionsFileList.push(collection);
          }
        }
      }
    }
  } catch (error) {
    console.error(error);

    return [];
  }

  return collectionsFileList;
};

export const retrieveAvailableImageCollections = async (): Promise<any[]> => {
  const supabase = supabaseClientUtils();
  let collectionsImageList: any[] = [];

  const availableCardImages = await supabase.storage
    .from("image")
    .list("slja-thumb");

  if (availableCardImages.data) {
    for (let i = 0; i < availableCardImages.data.length; i++) {
      const image = availableCardImages.data[i];

      if (image.name.includes(".emptyFolderPlaceholder")) {
        continue;
      }

      collectionsImageList.push(image.name);
    }
  }

  return collectionsImageList;
};

export const retriveCollectionInfoByRef = async (
  collectionRef: string
): Promise<any> => {
  const supabase = supabaseClientUtils();

  const collectionInfo: any = await supabase
    .from("msc_music")
    .select("*")
    .eq("msc_files_ref", collectionRef);

  return collectionInfo.data[0];
};

export const retriveCollectionInfoFromUser = async (): Promise<any[]> => {
  const supabase = supabaseClientUtils();

  const collectionFiles = await retriveAllCollectionsFiles();
  const availableImageCollections = await retrieveAvailableImageCollections();


  const userId = (await supabase.auth.getUser()).data.user?.id || null;

  let collectionInfoList: any[] = [];

  for (let i = 0; i < collectionFiles.length; i++) {
    const collectionFileName = collectionFiles[i].name.split(".")[0];

    const collectionInfo: any = await supabase
      .from("msc_music")
      .select("*")
      .eq("msc_files_ref", collectionFileName)
      .eq("msc_user_id", userId as string);

    if (userId == null || collectionInfo.data.length == 0) {
      return collectionInfoList;
    }

    let imagePublicLink;

    if (availableImageCollections.includes(collectionFileName + ".bmp")) {
      imagePublicLink = supabase.storage
        .from("image")
        .getPublicUrl("slja-thumb/" + collectionFileName + ".bmp")
        .data.publicUrl;
    } else {
      imagePublicLink = false;
    }

    if (collectionInfo.data) {
      collectionInfoList.push({
        collectionTitle: collectionInfo.data[0].msc_name,
        collectionDescription: collectionInfo.data[0].msc_description,
        collectionImage: imagePublicLink,
        collectionUpdatedAt: collectionInfo.data[0].msc_updated_at,
        collectionType: "Música",
        collectionRef: collectionInfo.data[0].msc_files_ref,
        collectionInfo: collectionInfo.data[0],
      });
    }
  }

  return collectionInfoList;
};

export const retrieveCollectionsCategory = async (): Promise<
  {
    mct_descricao: string | null;
    mct_id: string;
    mct_name: string;
  }[]
> => {
  const supabase = supabaseClientUtils();
  const musicCategory = await supabase.from("mct_music_category").select("*");
  const musicCategoriesList: {
    mct_descricao: string | null;
    mct_id: string;
    mct_name: string;
  }[] = [];

  for (
    let i = 0;
    musicCategory.data != null && i < musicCategory.data.length;
    i++
  ) {
    const category = musicCategory.data[i];

    musicCategoriesList.push(category);
  }

  return musicCategoriesList;
};

export const insertNewCollection = async (collectionInfo: {
  name: string;
  description?: string | null;
  album?: string | null;
  files_ref: string;
  main_ref: string | null;
  category: string;
  meta: object;
}): Promise<any> => {
  const supabase = supabaseClientUtils();

  const userId = (await supabase.auth.getUser()).data.user?.id;

  const { data, error } = await supabase
    .from("msc_music")
    .insert({
      msc_name: collectionInfo.name, // Add the msc_name property with a valid string value
      msc_description: collectionInfo.description,
      msc_album: null,
      msc_files_ref: collectionInfo.files_ref,
      msc_main_ref: collectionInfo.main_ref,
      msc_category: collectionInfo.category,
      msc_meta: collectionInfo.meta as Json,
      msc_user_id: userId as string, // Make sure userId is of type string
      msc_created_at: new Date().toDateString(),
      msc_updated_at: new Date().toDateString(),
    })
    .select();

  return { data: data, error: error };
};

export const insertNewCollectionFiles = async (
  collectionInfo: any,
  sljaFile: any,
  thumbFile?: any
): Promise<any> => {
  const supabase = supabaseClientUtils();

  let data;

  const sljaFileResponse = await supabase.storage
    .from("slja")
    .upload(
      `${collectionInfo.category}/${collectionInfo.files_ref}.slja`,
      sljaFile,
      {
        cacheControl: "3600",
        upsert: false,
      }
    );

  let thumbFileResponse = null;
  if (thumbFile) {
    thumbFileResponse = await supabase.storage
      .from("image")
      .upload(`slja-thumb/${collectionInfo.files_ref}.bmp`, thumbFile, {
        cacheControl: "3600",
        upsert: false,
      });
  }

  data = { sljaFileResponse, thumbFileResponse };

  return data;
};

export const retriveAllCollectionsInfo = async (): Promise<any[]> => {
  const supabase = supabaseClientUtils();
  const collectionFiles = await retriveAllCollectionsFiles();
  const availableImageCollections = await retrieveAvailableImageCollections();

  let collectionInfoList: any[] = [];

  for (let i = 0; i < collectionFiles.length; i++) {
    const collectionFileName = collectionFiles[i].name.split(".")[0];

    const collectionInfo: any = await supabase
      .from("msc_music")
      .select("*")
      .eq("msc_files_ref", collectionFileName);

    let imagePublicLink;

    if (availableImageCollections.includes(collectionFileName + ".bmp")) {
      imagePublicLink = supabase.storage
        .from("image")
        .getPublicUrl("slja-thumb/" + collectionFileName + ".bmp")
        .data.publicUrl;
    } else {
      imagePublicLink = false;
    }

    if (collectionInfo.data) {
      collectionInfoList.push({
        collectionTitle: collectionInfo.data[0].msc_name,
        collectionDescription: collectionInfo.data[0].msc_description,
        collectionImage: imagePublicLink,
        collectionUpdatedAt: collectionInfo.data[0].msc_updated_at,
        collectionType: "Música",
        collectionRef: collectionInfo.data[0].msc_files_ref,
        collectionInfo: collectionInfo.data[0],
      });
    }
  }

  return collectionInfoList;
};

export const updateCollectionInfo = async (collectionInfo: {
  name: string;
  description?: string | null;
  album?: string | null;
  files_ref: string;
  main_ref: string | null;
  category: string;
  meta: object;
}): Promise<any> => {
  const supabase = supabaseClientUtils();

  const { data, error } = await supabase
    .from("msc_music")
    .update({
      msc_name: collectionInfo.name,
      msc_description: collectionInfo.description,
      msc_album: null,
      msc_files_ref: collectionInfo.files_ref,
      msc_main_ref: collectionInfo.main_ref,
      msc_category: collectionInfo.category,
      msc_meta: collectionInfo.meta as Json,
      msc_updated_at: new Date().toDateString(),
    })
    .eq("msc_files_ref", collectionInfo.files_ref)
    .select();

  return { data: data, error: error };
};

export const updateCollectionSljaFile = async (
  collectionInfo: any,
  sljaFile: any
): Promise<any> => {
  const supabase = supabaseClientUtils();

  const { data, error } = await supabase.storage
    .from("slja")
    .update(
      `${collectionInfo.category}/${collectionInfo.files_ref}.slja`,
      sljaFile,
      {
        cacheControl: "3600",
        upsert: true,
      }
    );

  return { data: data, error: error };
};

export const updateCollectionThumbFile = async (
  collectionInfo: any,
  thumbFile: any
): Promise<any> => {
  const supabase = supabaseClientUtils();

  const { data, error } = await supabase.storage
    .from("image")
    .update(`slja-thumb/${collectionInfo.files_ref}.bmp`, thumbFile, {
      cacheControl: "3600",
      upsert: true,
    });

  return { data: data, error: error };
};

export const deleteCollectionByRef = async (
  collectionRef: string
): Promise<any> => {
  const supabase = supabaseClientUtils();

  // Retrieve collection info from database
  const collectionInfo = await retriveCollectionInfoByRef(collectionRef);

  // Delete collection info from database
  const { data, error } = await supabase
    .from("msc_music")
    .delete()
    .eq("msc_files_ref", collectionRef);

  // Delete collection files from storage
  await supabase.storage
    .from("slja")
    .remove([`${collectionInfo.msc_category}/${collectionRef}.slja`]);

  await supabase.storage
    .from("image")
    .remove([`slja-thumb/${collectionRef}.bmp`]);

  return { data: data, error: error };
};
