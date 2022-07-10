package loureen.userservice.entity;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.function.Supplier;

@ResponseStatus(code= HttpStatus.NOT_FOUND)
public class NotFoundException extends Exception{
}
