const TeamDto = require('./team-dto');
class UserDto{
    id;
    name;
    username;
    email;
    image;
    type;
    address;
    team;
    constructor(user)
    {
        console.log(user)
        this.id = user._id,
        this.name = user.name,
        this.username = user.username,
        this.email = user.email,
        this.image = user.image && `${process.env.BASE_URL}storage/images/profile/${user.image}`,
        this.type = user.type,
        this.address = user.address
        this.team = user.team && user.team.name && new TeamDto(user.team);
    }

}

module.exports = UserDto;