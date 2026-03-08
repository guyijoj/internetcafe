drop extension if exists "pg_net";

create sequence "public"."categories_id_seq";

create sequence "public"."menu_items_id_seq";


  create table "public"."categories" (
    "id" integer not null default nextval('public.categories_id_seq'::regclass),
    "name" text not null
      );



  create table "public"."menu_items" (
    "id" integer not null default nextval('public.menu_items_id_seq'::regclass),
    "category_id" integer,
    "name" text not null,
    "description" text,
    "price" integer not null,
    "weight" integer not null,
    "image_url" text
      );



  create table "public"."order_items" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "order_id" uuid not null,
    "price_at_time" numeric(10,2) not null,
    "quantity" integer not null,
    "menu_item_id" integer not null
      );



  create table "public"."orders" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "restaurant_id" uuid,
    "payment_method" text not null,
    "status" text default 'new'::text,
    "total_price" numeric(10,2) not null,
    "created_at" timestamp without time zone default now(),
    "comment" text,
    "utensils" smallint not null,
    "order_number" text,
    "user_id" uuid not null
      );



  create table "public"."restaurants" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "name" text not null,
    "address" text not null,
    "phone" text,
    "city" text not null,
    "workingHours" text,
    "photo" text,
    "link" text
      );



  create table "public"."users" (
    "user_name" text not null,
    "user_phone" text not null,
    "created_at" timestamp without time zone default now(),
    "user_id" uuid not null default gen_random_uuid(),
    "user_email" text not null
      );


alter sequence "public"."categories_id_seq" owned by "public"."categories"."id";

alter sequence "public"."menu_items_id_seq" owned by "public"."menu_items"."id";

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE INDEX idx_order_items_order_id ON public.order_items USING btree (order_id);

CREATE INDEX idx_orders_created_at ON public.orders USING btree (created_at);

CREATE INDEX idx_orders_status ON public.orders USING btree (status);

CREATE UNIQUE INDEX menu_items_pkey ON public.menu_items USING btree (id);

CREATE UNIQUE INDEX order_items_pkey ON public.order_items USING btree (id);

CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id);

CREATE UNIQUE INDEX restaurants_pkey ON public.restaurants USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (user_id);

CREATE UNIQUE INDEX users_user_email_key ON public.users USING btree (user_email);

CREATE UNIQUE INDEX users_user_id_key ON public.users USING btree (user_id);

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."menu_items" add constraint "menu_items_pkey" PRIMARY KEY using index "menu_items_pkey";

alter table "public"."order_items" add constraint "order_items_pkey" PRIMARY KEY using index "order_items_pkey";

alter table "public"."orders" add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";

alter table "public"."restaurants" add constraint "restaurants_pkey" PRIMARY KEY using index "restaurants_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."menu_items" add constraint "menu_items_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.categories(id) not valid;

alter table "public"."menu_items" validate constraint "menu_items_category_id_fkey";

alter table "public"."order_items" add constraint "fk_orfer_items_menu_item" FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id) ON DELETE SET NULL not valid;

alter table "public"."order_items" validate constraint "fk_orfer_items_menu_item";

alter table "public"."order_items" add constraint "order_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE not valid;

alter table "public"."order_items" validate constraint "order_items_order_id_fkey";

alter table "public"."orders" add constraint "orders_restaurant_id_fkey" FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) not valid;

alter table "public"."orders" validate constraint "orders_restaurant_id_fkey";

alter table "public"."orders" add constraint "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) not valid;

alter table "public"."orders" validate constraint "orders_user_id_fkey";

alter table "public"."users" add constraint "users_user_email_key" UNIQUE using index "users_user_email_key";

alter table "public"."users" add constraint "users_user_id_key" UNIQUE using index "users_user_id_key";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."menu_items" to "anon";

grant insert on table "public"."menu_items" to "anon";

grant references on table "public"."menu_items" to "anon";

grant select on table "public"."menu_items" to "anon";

grant trigger on table "public"."menu_items" to "anon";

grant truncate on table "public"."menu_items" to "anon";

grant update on table "public"."menu_items" to "anon";

grant delete on table "public"."menu_items" to "authenticated";

grant insert on table "public"."menu_items" to "authenticated";

grant references on table "public"."menu_items" to "authenticated";

grant select on table "public"."menu_items" to "authenticated";

grant trigger on table "public"."menu_items" to "authenticated";

grant truncate on table "public"."menu_items" to "authenticated";

grant update on table "public"."menu_items" to "authenticated";

grant delete on table "public"."menu_items" to "service_role";

grant insert on table "public"."menu_items" to "service_role";

grant references on table "public"."menu_items" to "service_role";

grant select on table "public"."menu_items" to "service_role";

grant trigger on table "public"."menu_items" to "service_role";

grant truncate on table "public"."menu_items" to "service_role";

grant update on table "public"."menu_items" to "service_role";

grant delete on table "public"."order_items" to "anon";

grant insert on table "public"."order_items" to "anon";

grant references on table "public"."order_items" to "anon";

grant select on table "public"."order_items" to "anon";

grant trigger on table "public"."order_items" to "anon";

grant truncate on table "public"."order_items" to "anon";

grant update on table "public"."order_items" to "anon";

grant delete on table "public"."order_items" to "authenticated";

grant insert on table "public"."order_items" to "authenticated";

grant references on table "public"."order_items" to "authenticated";

grant select on table "public"."order_items" to "authenticated";

grant trigger on table "public"."order_items" to "authenticated";

grant truncate on table "public"."order_items" to "authenticated";

grant update on table "public"."order_items" to "authenticated";

grant delete on table "public"."order_items" to "service_role";

grant insert on table "public"."order_items" to "service_role";

grant references on table "public"."order_items" to "service_role";

grant select on table "public"."order_items" to "service_role";

grant trigger on table "public"."order_items" to "service_role";

grant truncate on table "public"."order_items" to "service_role";

grant update on table "public"."order_items" to "service_role";

grant delete on table "public"."orders" to "anon";

grant insert on table "public"."orders" to "anon";

grant references on table "public"."orders" to "anon";

grant select on table "public"."orders" to "anon";

grant trigger on table "public"."orders" to "anon";

grant truncate on table "public"."orders" to "anon";

grant update on table "public"."orders" to "anon";

grant delete on table "public"."orders" to "authenticated";

grant insert on table "public"."orders" to "authenticated";

grant references on table "public"."orders" to "authenticated";

grant select on table "public"."orders" to "authenticated";

grant trigger on table "public"."orders" to "authenticated";

grant truncate on table "public"."orders" to "authenticated";

grant update on table "public"."orders" to "authenticated";

grant delete on table "public"."orders" to "service_role";

grant insert on table "public"."orders" to "service_role";

grant references on table "public"."orders" to "service_role";

grant select on table "public"."orders" to "service_role";

grant trigger on table "public"."orders" to "service_role";

grant truncate on table "public"."orders" to "service_role";

grant update on table "public"."orders" to "service_role";

grant delete on table "public"."restaurants" to "anon";

grant insert on table "public"."restaurants" to "anon";

grant references on table "public"."restaurants" to "anon";

grant select on table "public"."restaurants" to "anon";

grant trigger on table "public"."restaurants" to "anon";

grant truncate on table "public"."restaurants" to "anon";

grant update on table "public"."restaurants" to "anon";

grant delete on table "public"."restaurants" to "authenticated";

grant insert on table "public"."restaurants" to "authenticated";

grant references on table "public"."restaurants" to "authenticated";

grant select on table "public"."restaurants" to "authenticated";

grant trigger on table "public"."restaurants" to "authenticated";

grant truncate on table "public"."restaurants" to "authenticated";

grant update on table "public"."restaurants" to "authenticated";

grant delete on table "public"."restaurants" to "service_role";

grant insert on table "public"."restaurants" to "service_role";

grant references on table "public"."restaurants" to "service_role";

grant select on table "public"."restaurants" to "service_role";

grant trigger on table "public"."restaurants" to "service_role";

grant truncate on table "public"."restaurants" to "service_role";

grant update on table "public"."restaurants" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


