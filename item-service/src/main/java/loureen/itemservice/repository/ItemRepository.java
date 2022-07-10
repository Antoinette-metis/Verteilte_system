package loureen.itemservice.repository;

import loureen.itemservice.entity.Item;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository
        extends CrudRepository<Item, Integer> {
}
