
class TeamDto {
    name;
    description;
    image;
    admin;
    status;

    constructor(team){
        this.name = team.name;
        this.description = team.description;
        this.image = team.image && `${process.env.BASE_URL}storage/images/teams/${team.image}`,
        this.admin = team.admin;
        this.status = team.status;
    }

}

module.exports = TeamDto;