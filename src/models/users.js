export class Users {
    constructor(user){
        this.id = user.id;
        this.firebase_uid = user.firebase_uid ?? user.firebaseUid;
        this.name = user.name;
        this.matricula = user.matricula;
        this.email = user.email;
        this.phone = user.phone;
        this.picture = user.picture;
        this.profile = user.profile;
        this.roles = user.roles;
        this.pending = user.pending;
        this.createdAt = user.created_at ?? user.createdAt;
        this.updatedAt = user.updated_at ?? user.updatedAt;
        this.pushEnabled = user.push_enabled ?? user.pushEnabled;
        this.emailEnabled = user.email_enabled ?? user.emailEnabled;
        this.comuniqEnabled = user.comuniq_enabled ?? user.comuniqEnabled;
        this.pushSoundEnabled = user.push_sound_enabled ?? user.pushSoundEnabled;
    }

    static fromArray(usersArray) {
        return usersArray.map((user) => new Users(user));
    }
}