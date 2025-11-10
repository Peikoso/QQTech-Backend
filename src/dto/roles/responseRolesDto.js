export class ResponseRolesDto {
    constructor(role) {
        this.id = role.id;
        this.name = role.name;
        this.color = role.color;
        this.description = role.description;
        this.createdAt = role.createdAt;
        this.updatedAt = role.updatedAt;
    }

    static fromArray(rolesArray) {
        return rolesArray.map(role => new ResponseRolesDto(role));
    }
}