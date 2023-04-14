CREATE TABLE Events (
    event_id serial PRIMARY KEY NOT NULL,
    event_name varchar(50) NOT NULL,
    industry varchar(50) NOT NULL,
    event_type varchar(255) NOT NULL,
    event_description text NOT NULL,
    host_id integer NOT NULL,
    total_attendees integer NOT NULL,
    event_location text NOT NULL,
    event_status boolean NOT NULL,
    date_time timestamp NOT NULL,
    event_price integer NOT NULL,
    picture bytea
) WITH (
    OIDS = False
);

CREATE TABLE Users (
    user_id serial PRIMARY KEY NOT NULL,
    username varchar(255) UNIQUE NOT NULL,
    password_ text NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    bio text NOT NULL,
    industry varchar(255) NOT NULL,
    user_resume bytea,
    picture bytea
) WITH (
    OIDS = False
);

CREATE TABLE Attendees (
    attendee_id serial PRIMARY KEY NOT NULL,
    event_id integer REFERENCES Events(event_id) NOT NULL,
    user_id integer REFERENCES Users(user_id) NOT NULL
) WITH (
    OIDS = False
);

-- FUNCTION decrement_attendees_count
CREATE OR REPLACE FUNCTION decrease_attendees_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE events SET total_attendees = total_attendees - 1 WHERE event_id = OLD.event_id;
    RAISE NOTICE 'Attendee deleted from event %', OLD.event_id;
    RETURN OLD;
END
$$ LANGUAGE plpgsql;

-- TRIGGER When a user deletes themselves, call function decrement_attendees_count
CREATE TRIGGER decrement_attendee_count
AFTER DELETE ON attendees
FOR EACH ROW
EXECUTE FUNCTION decrease_attendees_count();

-- FUNCTION increase_attendees_count
CREATE OR REPLACE FUNCTION increase_attendees_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE events SET total_attendees = total_attendees + 1 WHERE event_id = OLD.event_id;
    RAISE NOTICE 'New attendee added to event %', OLD.event_id;
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- TRIGGER When a user is INSERTED into attendees, call function increase_attendees_count
CREATE TRIGGER increment_attendee_count
AFTER INSERT ON attendees
FOR EACH ROW
EXECUTE FUNCTION increase_attendees_count();

