export const retriveAllToolsCategories = async (): Promise<any[]> => {
  const supabase = supabaseClientUtils();
  let toolsCategories: object[] = [];
  try {
    const categories = await supabase.from("tct_tool_category").select("*");

    if (categories.data) {
      for (let i = 0; i < categories.data.length; i++) {
        const category = categories.data[i];

        toolsCategories.push(category);
      }
    }
  } catch (error) {
    console.error(error);

    return [];
  }

  return toolsCategories;
};

export const retriveAllTools = async (): Promise<any[]> => {
  const supabase = supabaseClientUtils();
  let toolsList: object[] = [];
  try {
    const tools = await supabase.from("too_tool").select("*");

    if (tools.data) {
      for (let i = 0; i < tools.data.length; i++) {
        const tool = tools.data[i];

        toolsList.push(tool);
      }
    }
  } catch (error) {
    console.error(error);

    return [];
  }

  return toolsList;
};

export const retriveAllToolsWithCategory = async (): Promise<any[]> => {
  const supabase = supabaseClientUtils();
  let toolsList: object[] = [];
  try {
    const tools = await supabase
      .from("too_tools")
      .select(
        "too_name, too_descricao, too_image_ref, too_url, too_category (tct_id, tct_name, tct_descricao, tct_order)"
      );

    if (tools.data) {
      for (let i = 0; i < tools.data.length; i++) {
        const tool = tools.data[i];

        toolsList.push(tool);
      }
    }
  } catch (error) {
    console.error(error);

    return [];
  }

  return toolsList;
};

