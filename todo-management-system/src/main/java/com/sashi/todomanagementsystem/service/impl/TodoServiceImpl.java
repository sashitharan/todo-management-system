package com.sashi.todomanagementsystem.service.impl;

import com.sashi.todomanagementsystem.dto.TodoDto;
import com.sashi.todomanagementsystem.entity.Todo;
import com.sashi.todomanagementsystem.repository.TodoRepository;
import com.sashi.todomanagementsystem.service.TodoService;
import lombok.AllArgsConstructor;
import org.apache.kafka.common.errors.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;

    private ModelMapper modelMapper;

    @Override
    public TodoDto addTodo(TodoDto todoDto) {

        // convert TodoDto into Todo Jpa entity
        Todo todo = modelMapper.map(todoDto, Todo.class);

        // Todo Jpa entity
        Todo savedTodo = todoRepository.save(todo);

        // Convert saved Todo Jpa entity object into TodoDto object
        TodoDto savedTodoDto = modelMapper.map(savedTodo, TodoDto.class);
        return savedTodoDto;
    }

    @Override
    public TodoDto getTodo(Long id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id:" + id));

        return modelMapper.map(todo, TodoDto.class);
    }

    @Override
    public List<TodoDto> getAllTodos() {

        List<Todo> todos = todoRepository.findAll();

        return todos.stream().map((todo) -> modelMapper.map(todo, TodoDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public TodoDto updateTodo(TodoDto todoDto, Long id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id : " + id));
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());

        Todo updatedTodo = todoRepository.save(todo);

        return modelMapper.map(updatedTodo, TodoDto.class);
    }

    @Override
    public void deleteTodo(Long id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id : " + id));

        todoRepository.deleteById(id);
    }

    @Override
    public TodoDto completeTodo(Long id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id : " + id));

        todo.setCompleted(Boolean.TRUE);

        Todo updatedTodo = todoRepository.save(todo);

        return modelMapper.map(updatedTodo, TodoDto.class);
    }

    @Override
    public TodoDto inCompleteTodo(Long id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id : " + id));

        todo.setCompleted(Boolean.FALSE);

        Todo updatedTodo = todoRepository.save(todo);

        return modelMapper.map(updatedTodo, TodoDto.class);
    }
}
