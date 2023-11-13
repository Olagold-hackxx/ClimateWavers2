import matplotlib.pyplot as plt
from disaster_predictive_model import training_mse
from disaster_predictive_model import training_cod 

rf_train_mse = sum(training_mse)/len(training_mse)
rf_train_r2 = sum(training_cod)/len(training_cod)

rf_test_mse = sum(mse_values)/len(mse_values)
rf_test_r2 = sum(cod_values)/len(cod_values)

rf_result = pd.DataFrame(['Random Forest', rf_train_mse, rf_test_mse, rf_train_r2, rf_test_r2]).transpose()
rf_result.columns = ["Method", "Training MSE", "Test MSE", "Training R2", "Test R2"]
rf_result

plt.scatter(x=y_train, y=y_train_pred, alpha=0.3)
plt.plot
plt.ylabel("Predicted Disasters Magnitude")
plt.xlabel("Past Disasters Magnitude")