// note about SQL here: ARRAYS OF VARIABLE LENGTH ARE BANNED.
// we can assume any reference to an Interface is done by key.

export type Email = ShortString;
export type PhoneNumber = ShortString;
export type Token = string; // never know how our tokens are gonna look until we have them 
export type DB_KEY = number; // INTEGER: should be a PK AUTOINCREMENT
export type Paragraph = string;
export type ShortString = string;
export type PersonName = ShortString; // should be fuzzy matchable

export type Latitude = number;
export type Longitude = number;
export type LocationName = string;

interface _ContactInfo {

	email_work ?: Email;
	phone_work ?: PhoneNumber;
	phone_home ?: PhoneNumber;
	phone_cell ?: PhoneNumber;
	email_personal ?: Email;
}

interface _Reviewer extends _ContactInfo {
	name : PersonName;
	field : ShortString;
	// contact : ContactInfo;
}

interface _Review {
	reviewer : _Reviewer;
	description : Paragraph;
	date : Date;
	location : _Location;
}

interface _Coordinates {
	x : Longitude;
	y : Latitude;
}

interface _Session {
	token ?: Token;
}

interface _Location {
	name : LocationName;
	coords : _Coordinates;
}