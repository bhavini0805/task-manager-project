#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"TaskManagerApp";
  self.initialProps = @{};
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  // Use explicit IP for localhost
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
  // If the above doesn't work, try this explicit URL:
  // return [NSURL URLWithString:@"http://127.0.0.1:8081/index.bundle?platform=ios"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end