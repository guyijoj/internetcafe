import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async (req) => {
  if(req.method !== "POST"){
    return new Response("Method is not allowed",{status: 405})
  }

  


  const {payment_method, comment, utensils, total_price, status} = await req.json();
  if (
  payment_method == null ||
  total_price == null ||
  utensils == null
) {
    return new Response(
      JSON.stringify({error: "Missing field"}),
      {status: 400}
    )
  }

  const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

  const {data, error} = await supabase.from('orders')
.insert({
  payment_method: payment_method,
  status: status,
  total: total_price,
  utensils: utensils,
  comment: comment,

}).select().single()


console.log("DATA:", data);
console.log("ERROR:", error);


if(error) return new Response(JSON.stringify({error}), {status: 500})
  
  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } }
  );
});
