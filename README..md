Skip to content
This repository
Search
Pull requests
Issues
Gist
 @zenvercoder
 Watch 17
  Star 1
 Fork 1 gSchool/knex-migration-seed-music-script Private
 Code  Issues 0  Pull requests 0  Wiki  Pulse  Graphs
Pair up with someone and run through this script.
 2 commits
 1 branch
 0 releases
 1 contributor
Clone or download  Create new file Upload files Find file Branch: master New pull request
Latest commit 1111262  on Jun 13 @dannyfritz dannyfritz committed on GitHub 🎉
README.md	🎉	3 months ago
 README.md
Music Database

Music Icon

Backstory

You and a partner have thought of the next big idea to sweep the world. You're going to create a database of all music. The two of you have decided to use knex to collaborate on a db schema.

Directions

As a 2 person super-team, follow the following steps.

Superfly is the person whose first name comes first alphabetically.
Vandal is the person whose first name comes second alphabetically.
Knex Installation

Because the super-team decided to use knex, They know that installing globally will allow them to use the migration and seed features of knex.

Superfly and Vandal both install knex globally on their machines.

npm install -g knex
Project Setup

Suddenly, Superfly takes some initiative and starts the project. Superfly navigates into her workspace and types out a few commands on her computer while Vandal watches.

mkdir music-db
cd music-db
npm init -y
npm install --save pg knex
Superfly looks at her fresh package.json and notices pg and knex in her dependencies. She and Vandal look up pg on npmjs. Scratching their heads, the super-duo realize knex needs pg to work with Postgres.

Knex Initialization

Vandal scans through the knex docs a bit and notices the next step to setting up knex is to run init. Vandal informs Superfly to run this next command on her terminal.

knex init
Superfly spies a new file on her computer. THE knexfile.js FILE! This astute team isn't stumped though. They know knexfile.js is there to tell knex how to connect to a database. Superfly opens up the file and takes a look at it.

She takes a brief look and questions out loud.

Superfly: What is all this garbage in this knexfile.js?
Vandal speaks up and notifies Superfly that we need to make some changes. The Vandal lists off a couple things she notices.

There are way too many databases in here, we are only concerned with 2: development and production.

We aren't concerned with sqlite3 and all this other jibber jabber. Just give us the pg databases!

Superfly modifies her knexfile.js to look like this and appease Vandal.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/music'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

}
Creating a Schema

The Vandal exclaims to the Superfly.

Vandal: They call me the vandal because I'm scheming up wicked schemas!
The fantastic-two decides they need 2 tables in their database: artist and track.

Superfly types into her terminal two commands:

knex migrate:make artist
knex migrate:make track
Superfly, with her elbow on the table, rests her head in her chin and ponders what has happened with her file-system.

Superfly: Hrmmm, it created a migrations folder with 2 weird files in it.
The Vandal chimes in:

Vandal: Those look like timestamps followed by the _name we named it.
Yes Vandal, you are very very smart. Pat yourself on the back. The Superfly pats you on the back for being so smart too.

Using the Schema Builder in knex, Superfly creates a simple migration for the artist table. She knows the their artists will have a name and an id that increments with serial. Vandal loves that the knex API is based on promises.

They both think to themselves:

Both in Unison: Promises are seriously the bomb
Superfly opens up the timestamp_artist.js file and types:

exports.up = function(knex, Promise) {
  return knex.schema.createTable("artist", function (table) {
    table.increments()
    table.text("name")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("artist")
}
Superfly explains line-by-line to Vandal what this migration is doing:

exports.up tells knex what to do when running the migration.

knex.schema.createTable creates a new table named artist in the database.

table.increments() creates an id column with type serial.

table.text("name") creates a text column named name.

exports.down tells knex what to do when undoing a migration.

This is important for rolling back changes you didn't intend.
knex.schema.dropTable deletes a table from the database.

Superfly opens up the timestamp_track.js file and types:

exports.up = function(knex, Promise) {
  return knex.schema.createTable("track", function (table) {
    table.increments()
    table.text("name")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("track")
}
Superfly runs the migrations to setup the database

knex migrate:latest
Using environment: development
Knex:warning - Pool2 - Error: Pool was destroyed
Knex:Error Pool2 - error: database "music" does not exist
Error: Pool was destroyed
....
Vandal gives out a hearty laugh at Superfly and proclaims:

Vandal: You noob. You can't write to a database that doesn't exist! Run this command and try not to empty your baby bottle.
createdb music
Vandal: Try again now noob.
Superfly types into her terminal again with some frustration and defeat:

knex migrate:latest
Using environment: development
Batch 1 run: 2 migrations
.../music-db/migrations/20160612220726_artist.js
.../music-db/migrations/20160612220730_track.js
GitHub

Vandal itches to get her hands on the keyboard and tells Superfly to push up to GitHub.

Superfly goes to GitHub and creates a music-db repo. Superfly types into her terminal:

git init
git remote add origin <YOUR REPO REMOTE HERE>
npm install -g gitignore
gitignore node
git add .
git commit -m ":tada:"
git push origin master
Schema Collaboration

Vandal forks the repo and clones it.

git clone <YOUR REPO REMOTE HERE>
cd music-db
npm install
Superfly informs Vandal that Vandal can get the same schema they just created by typing knex migrate:latest in the project's top directory.

knex migrate:latest
Superfly snickers.

Superfly: Who is the noob now? Noob!
Vandal rolls her eyes and types:

createdb music
knex migrate:latest
Inspection using psql

Vandal decides to get her hands dirty and enters psql:

psql -d music

psql (9.4.5)
music=#
Vandal checks out all the tables in the database

music=# \d

List of relations
Schema |          Name          |   Type   |  Owner
--------+------------------------+----------+----------
public | artist                 | table    | postgres
public | artist_id_seq          | sequence | postgres
public | knex_migrations        | table    | postgres
public | knex_migrations_id_seq | sequence | postgres
public | knex_migrations_lock   | table    | postgres
public | track                  | table    | postgres
public | track_id_seq           | sequence | postgres
(7 rows)
Vandal gets suddenly confused.

Vandal: Holy Smokes Batman! What are these knex tables here for?! Did you do this Superfly?
Superfly shakes her head no.

Superfly: Vandal, the way knex migrations work is by using these tables! knex_migrations keeps track of which migrations have run. knex_migrations_id_seq is bookkeeping for the Postgres serial type. knex_migrations_lock is to prevent you from being stupid and running migrations twice at the same time.
Vandal doesn't believe her and pokes around a bit:

music=# TABLE knex_migrations;
 id |           name           | batch |       migration_time
----+--------------------------+-------+----------------------------
  1 | 20160612220726_artist.js |     1 | 2016-06-12 22:26:28.396-06
  2 | 20160612220730_track.js  |     1 | 2016-06-12 22:26:28.417-06
(2 rows)


music=#
Vandal realizes these are the 2 migration files in the migrations folder.

Vandal: So... You're saying... knex_migrations is how knex keeps track of which migrations have run?

Superfly: Yep!
Vandal starts looking at the tables they expected:

music=# \d artist
                         Table "public.artist"
 Column |  Type   |                      Modifiers
--------+---------+-----------------------------------------------------
 id     | integer | not null default nextval('artist_id_seq'::regclass)
 name   | text    |
Indexes:
    "artist_pkey" PRIMARY KEY, btree (id)


music=# \d track
                         Table "public.track"
 Column |  Type   |                     Modifiers
--------+---------+----------------------------------------------------
 id     | integer | not null default nextval('track_id_seq'::regclass)
 name   | text    |
Indexes:
    "track_pkey" PRIMARY KEY, btree (id)


music=#
Vandal: This looks perfect. Just needs some data!

Superfly: Yep! Sure does!
Seeding a Database

Vandal types 2 commands into her terminal:

knex seed:make artist
knex seed:make track
Vandal: Alright, that created a directory called seeds. I see there are 2 files in there, one for each name.
Vandal opens up artist.js.

Superfly: That looks dumb. Let's make the seed actually make sense. colName? We don't have a colName in our schema! Also weird, what is Promise.join?

Vandal: It is a Bluebird utility similar to Promise.all.
Vandal updates the seed files:

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('artist').del(),

    // Inserts seed entries
    knex('artist').insert({id: 1, name: 'The Beatles'}),
    knex('artist').insert({id: 2, name: 'The Flaming Lips'})
  );
};
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('track').del(),

    // Inserts seed entries
    knex('track').insert({id: 1, name: 'Strawberry Fields'}),
    knex('track').insert({id: 2, name: 'Soft Bulletin'})
  );
};
Vandal: Tank, load the jump program.
knex seed:run
Using environment: development
Ran 2 seed files
.../music-db/seeds/artist.js
.../music-db/seeds/track.js
Superfly: Do you know how knex runs seed files? It runs every seed file alphabetically every time you seed:run. Knex isn't intelligent about which seeds have run like it is smart about which migrations have run. It just runs them all each time.

Vandal: I should probably save.
git add -A
git commit -m ":sparkles:"
git push origin master
Updating an Existing Schema

Superfly: We forgot to link tracks to artists!

Vandal: I'll just quick update the migration files!
Vandal opens up her timestamp_track.js file in her migrations folder:

Vandal: I'll just change this one line. Easy!
exports.up = function(knex, Promise) {
  return knex.schema.createTable("track", function (table) {
    table.increments()
    table.text("name")
    table.integer("artist_id")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("track")
}
Vandal types in her terminal:

knex migrate:latest
Using environment: development
Already up to date
Superfly: What happened? Doesn't seem like that worked.
Vandal types flummuxedly into her terminal:

psql

psql (9.4.5)
music=# \d track

Column |  Type   |                     Modifiers
--------+---------+----------------------------------------------------
id     | integer | not null default nextval('track_id_seq'::regclass)
name   | text    |
Indexes:
   "track_pkey" PRIMARY KEY, btree (id)
Vandal: Nothing happened! Gwar!

Superfly: Remember how knex keeps track of migrations in the knex_migrations table? I think knex thought the migration was already run and had skipped it! We aren't supposed to edit existing migrations, we are supposed to create a new migration for every change to the schema we make!

Vandal: I guess that kind of makes sense... Let me reset my git repo and try again.
music=# \q

git reset --hard
knex migrate:make track
Using environment: development
Created Migration:
.../music-db/migrations/20160612230632_track.js
Vandal opens up the latest track migration file and types:

exports.up = function(knex, Promise) {
  return knex.schema.table("track", function (table) {
    table.integer("artist_id")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table("track", function (table) {
    table.dropColumn("artist_id")
  })
}
Vandal: Here goes nothing!

Superfly: Well, at least it's something I guess...
knex migrate:latest
Using environment: development
Batch 2 run: 1 migrations
.../music-db/migrations/20160612230632_track.js
Vandal: Looks good! Committing changes.
git add -A
git commit -m ":key: Artist Foreign Key"
git push origin master
Vandal: I'm going to do a pull request for this.

Superfly: Cool, I'll accept it and continue working on it.
Updating Seed Files

Superfly: Alright, I accepted your pull request. I'll pull down the changes and continue where you left off.
git pull origin master
knex migrate:latest
Vandal: Where I left off? I finished the dang thing!
Superfly wags her finger at Vandal

Superfly: Nuh uh uh. You forgot to update the seed file!
Superfly adds artist_id values to the track.js seed:

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('track').del(),

    // Inserts seed entries
    knex('track').insert({id: 1, name: 'Strawberry Fields', artist_id: 1}),
    knex('track').insert({id: 2, name: 'Soft Bulletin', artist_id: 2})
  );
};
knex seed:run
Using environment: development
Ran 2 seed files
.../music-db/seeds/artist.js
.../music-db/seeds/track.js
Vandal: Do a join on that beautiful foreign key!

Superfly: Alright!
psql -d music
SELECT track.name as track, artist.name as artist FROM track JOIN artist ON artist_id = artist.id;
track       |      artist
-------------------+------------------
Strawberry Fields | The Beatles
Soft Bulletin     | The Flaming Lips
(2 rows)
Vandal: I think we're going to make a lot of money off of this.

Superfly: I think so too.
Stretch

Push it to Heroku
Do it again without looking at the notes
Make a more complicated schema
Do a data migration during a schema migration
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help