package loureen.userservice.Controller;

import lombok.extern.slf4j.Slf4j;
import loureen.userservice.entity.NotFoundException;
import loureen.userservice.entity.User;
import loureen.userservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class Controller {

    private final UserService userService;

    public Controller(UserService userService) {
        this.userService = userService;
    }

    //Get
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value = "/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }


    @GetMapping(value = "/users/{userId}")
    public User getUserById(@PathVariable Integer userId) throws NotFoundException {
        log.info("Recive Get requist to /User/{}",userId);
        var userOptional= userService.getUserById(userId);
        if(userOptional.isPresent()){
            log.info("User {} ist Vorhanden", userOptional.get());
        }
        else{
            log.info("User ist nicht Vorhanden ");
        }

        return userOptional.orElseThrow(NotFoundException::new);
    }

    //Post nutzer anzulegen
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value= "/users")
    public User registerNewUser(@RequestBody User user){
        log.info("Recived PostMapping to /users with requistBody {}",user);
        return userService.addOrUpdateUser(user);
    }


    //Put Update user
    @ResponseStatus(HttpStatus.OK)
    @PutMapping(value = "/users/{userId}")
    public User editUser(@PathVariable Integer userId,@RequestBody User user){
        log.info("Recived Put requist to /users/{} with requistBody{} ",userId,user);
        user.setUserId(userId);
        return userService.addOrUpdateUser(user);
    }

    //delete user through Id
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(value = "/users/{userId}")
    public ResponseEntity deleteUser(@PathVariable Integer userId){
        log.info("Recived delete request to /users/{}  ",userId);
        userService.deleteUserById(userId);
        return ResponseEntity.ok().build();

    }
}
