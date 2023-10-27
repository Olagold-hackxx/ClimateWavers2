from torch.utils.data import TensorDataset, DataLoader, RandomSampler, SequentialSampler
from process_dataset import DisastersData


class DisastersDataLoader:

    def __init__(self, data_file, batch_size=8):
        self.data = DisastersData(data_file)
        self.batch_size = batch_size
        self.create_loaders()

    def create_loaders(self):
        """
        Create Torch dataloaders for data splits
        """
        self.data.text_to_tensors()
        print('creating dataloaders')
        train_data = TensorDataset(self.data.train_inputs,
                                    self.data.train_masks,
                                    self.data.train_labels)
        train_sampler = RandomSampler(train_data)
        self.train_dataloader = DataLoader(train_data,
                                            sampler=train_sampler,
                                            batch_size=self.batch_size)

        validation_data = TensorDataset(self.data.validation_inputs,
                                        self.data.validation_masks,
                                        self.data.validation_labels)
        validation_sampler = SequentialSampler(validation_data)
        self.validation_dataloader = DataLoader(validation_data,
                                                sampler=validation_sampler,
                                                batch_size=self.batch_size)

        test_data = TensorDataset(self.data.test_inputs,
                                        self.data.test_masks,
                                        self.data.test_labels)
        test_sampler = SequentialSampler(test_data)
        self.test_dataloader = DataLoader(test_data,
                                                sampler=test_sampler,
                                                batch_size=self.batch_size)
        print('finished creating dataloaders')

if __name__=='__main__':
    loader = DisastersDataLoader('dataset/disaster_text.csv')
    loader.create_loaders()
