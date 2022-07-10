package loureen.itemservice.service;

import loureen.itemservice.entity.Item;
import loureen.itemservice.repository.ItemRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Slf4j
@Service
public class PersistentItemService implements ItemService {
    private final ItemRepository itemRepository;

    public PersistentItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Iterable<Item> getItems() {
        var items = itemRepository.findAll();
        log.info("getItems() returned {}", items);
        return items;
    }

    @Override
    public Optional<Item> getItemById(int itemId) {
        return itemRepository.findById(itemId);
    }


    @Override
    public Item add_or_Update_Item(Item item) {
        log.info("Adding item {}", item);
        return itemRepository.save(item);
    }

    @Override
    public void deleteItemById(int itemId) {
        itemRepository.deleteById(itemId);

    }
}
