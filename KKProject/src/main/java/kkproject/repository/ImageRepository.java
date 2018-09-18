package kkproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kkproject.domain.ImageModel;

public interface ImageRepository extends JpaRepository<ImageModel, Long>{

}
