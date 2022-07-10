package loureen.itemservice.service;

import loureen.itemservice.entity.Item;

import java.util.Optional;

public interface ItemService {
    Iterable<Item> getItems();
    Optional<Item> getItemById(int itemId);
    Item add_or_Update_Item(Item item);
    void deleteItemById(int itemId);
}
