package loureen.itemservice.controller;


import io.micrometer.core.instrument.MeterRegistry;
import loureen.itemservice.entity.Item;
import loureen.itemservice.entity.NotFoundException;
import loureen.itemservice.service.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@Slf4j
@RestController
public class ItemController {
    private final ItemService itemService;


    public ItemController(MeterRegistry meterRegistry, ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping(value = "/items")
    public Iterable<Item> getItems() {

        log.info("Received GET request to /items");
        return itemService.getItems();
    }
    @GetMapping(value = "/items/{itemId}")
    public Item getItemById(@PathVariable Integer itemId) throws NotFoundException {
        log.info("Recive Get requist to /items/{}",itemId);
        var itemOptional= itemService.getItemById(itemId);
        if(itemOptional.isPresent()){
            log.info("Item {} ist Vorhanden", itemOptional.get());
        }
        else{
            log.info("User ist nicht Vorhanden ");
        }
        return itemOptional.orElseThrow(NotFoundException::new);
    }


    @PostMapping(value = "/items")
    public Item addItem(@RequestBody Item item) {
        log.info("Received POST request to /items with requistBody {}",item);
        return itemService.add_or_Update_Item(item);
    }

    @PutMapping(value = "/items/{itemId}")
    public Item updateItem(@PathVariable Integer itemId,@RequestBody Item item) {
        log.info("Received PUT request to /items /{} with requistBody {}",itemId,item);
        return itemService.add_or_Update_Item(item);
    }

    //delete item through Id
    @DeleteMapping(value = "/items/{itemId}")
    public ResponseEntity deleteUser(@PathVariable Integer itemId){
        log.info("Recived delete request to /items/{}  ",itemId);
        itemService.deleteItemById(itemId);
        return ResponseEntity.ok().build();

    }




}
